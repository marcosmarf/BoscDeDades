import os
import re
import sys
from datetime import datetime

# Configuración
TEMPLATE_ORDER = [
    "WEB_PAGE_HEADER",
    "WEB_PAGE_FOOTER",
    "WEB_ROOT_PAGE_CONTENT",
    "WEB_REMOVE_CONFIG_CONTENT",
    "WEB_RESET_CONTENT",
]
INTL_MACROS = [
    "INTL_LANG",
    "INTL_BACK_TO_HOME",
    "INTL_REPORT_ISSUE",
    "INTL_ACTIVE_SENSORS_MAP",
    "INTL_CONFIGURATION_DELETE",
    "INTL_CONFIGURATION_REALLY_DELETE",
    "INTL_DELETE",
    "INTL_CANCEL",
    "INTL_RESTART",
    "INTL_REALLY_RESTART_SENSOR",
    "INTL_PM_SENSOR",
    "INTL_FIRMWARE",
    "INTL_HOME",
    # Añade aquí cualquier INTL_* adicional que uses
]

def extract_templates(source):
    # Delete Coments
    source = re.sub(r'<!--.*?-->', '', source, flags=re.DOTALL)
    templates = {}
    for m in re.finditer(r'<template\s+id=["\']([^"\']+)["\'][^>]*>', source, re.IGNORECASE):
        tmpl_id = m.group(1)
        if not tmpl_id.startswith("WEB_"):
            continue
        content_start = m.end()
        search_from = content_start
        depth = 1
        content_end = len(source)
        while depth > 0:
            nxt_open  = re.search(r'<template\b',   source[search_from:], re.IGNORECASE)
            nxt_close = re.search(r'</template\s*>', source[search_from:], re.IGNORECASE)
            if nxt_close is None:
                break
            if nxt_open and nxt_open.start() < nxt_close.start():
                depth += 1
                search_from += nxt_open.end()
            else:
                depth -= 1
                if depth == 0:
                    content_end = search_from + nxt_close.start()
                search_from += nxt_close.end()
        content = source[content_start:content_end]
        content = re.sub(r'<!--.*?-->', '', content, flags=re.DOTALL)
        templates[tmpl_id] = content
    return templates


# CSS optimizer
def minify_css(css):
    css = re.sub(r'/\*.*?\*/', '', css, flags=re.DOTALL)
    css = re.sub(r'\s+', ' ', css)
    css = re.sub(r'\s*([:{};,>~+])\s*', r'\1', css)
    css = re.sub(r'\s*\{\s*', '{', css)
    return css.strip()

#Macros
def protect_macros(text):
    found = []
    for macro in INTL_MACROS:
        ph = f"\x00M{len(found)}\x00"
        new_text, n = re.subn(r'\b' + re.escape(macro) + r'\b', ph, text)
        if n > 0:
            text = new_text
            found.append((ph, macro))
    return text, found
def restore_macros(line, found):
    for ph, macro in found:
        line = line.replace(ph, f'" {macro} "')
    return line
def html_to_c_string(html):
    html, found = protect_macros(html)
    html = html.replace('\\', '\\\\')
    html = html.replace('"', '\\"')
    lines = html.splitlines()
    while lines and not lines[0].strip():
        lines.pop(0)
    while lines and not lines[-1].strip():
        lines.pop()
    result = []
    for line in lines:
        restored = restore_macros(line, found)
        result.append(f'    "{restored}\\n"')
    return '\n'.join(result)

STATIC_STRINGS = r"""const char TXT_CONTENT_TYPE_JSON[] PROGMEM = "application/json";
const char TXT_CONTENT_TYPE_INFLUXDB[] PROGMEM = "application/x-www-form-urlencoded";
const char TXT_CONTENT_TYPE_TEXT_HTML[] PROGMEM = "text/html; charset=utf-8";
const char TXT_CONTENT_TYPE_TEXT_CSS[] PROGMEM = "text/css";
const char TXT_CONTENT_TYPE_TEXT_PLAIN[] PROGMEM = "text/plain";
const char TXT_CONTENT_TYPE_IMAGE_PNG[] PROGMEM = "image/png";

const char DBG_TXT_TEMPERATURE[] PROGMEM = "Temperature (\xc2\xb0C): ";
const char DBG_TXT_HUMIDITY[] PROGMEM = "Humidity (%): ";
const char DBG_TXT_PRESSURE[] PROGMEM = "Pressure (hPa): ";
const char DBG_TXT_CO2PPM[] PROGMEM = "CO\xe2\x82\x82 (ppm): ";
const char DBG_TXT_START_READING[] PROGMEM = "R/ ";
const char DBG_TXT_END_READING[] PROGMEM = "/R ";
const char DBG_TXT_CHECKSUM_IS[] PROGMEM = "Checksum is: ";
const char DBG_TXT_CHECKSUM_SHOULD[] PROGMEM = "Checksum should: ";
const char DBG_TXT_DATA_READ_FAILED[] PROGMEM = "Data read failed";
const char DBG_TXT_UPDATE[] PROGMEM = "[update] ";
const char DBG_TXT_UPDATE_FAILED[] PROGMEM = "Update failed.";
const char DBG_TXT_UPDATE_NO_UPDATE[] PROGMEM = "No update.";
const char DBG_TXT_SENDING_TO[] PROGMEM = "## Sending to ";
const char DBG_TXT_SDS011_VERSION_DATE[] PROGMEM = "SDS011 version date";
const char DBG_TXT_NPM_VERSION_DATE[] PROGMEM = "Next PM version date";
const char DBG_TXT_CONNECTING_TO[] PROGMEM = "Connecting to ";
const char DBG_TXT_FOUND[] PROGMEM = " ... found";
const char DBG_TXT_NOT_FOUND[] PROGMEM = " ... not found";
const char DBG_TXT_SEP[] PROGMEM = "----";

const char SENSORS_SDS011[] PROGMEM = "SDS011";
const char SENSORS_PPD42NS[] PROGMEM = "PPD42NS";
const char SENSORS_PMSx003[] PROGMEM = "PMSx003";
const char SENSORS_HPM[] PROGMEM = "Honeywell PM";
const char SENSORS_NPM[] PROGMEM = "Tera Sensor Next PM";
const char SENSORS_IPS[] PROGMEM = "Piera Systems IPS-7100";
const char SENSORS_SPS30[] PROGMEM = "Sensirion SPS30";
const char SENSORS_DHT22[] PROGMEM = "DHT22";
const char SENSORS_DS18B20[] PROGMEM = "DS18B20";
const char SENSORS_HTU21D[] PROGMEM = "HTU21D";
const char SENSORS_SHT3X[] PROGMEM = "SHT3x";
const char SENSORS_SCD30[] PROGMEM = "SCD30";
const char SENSORS_BMP180[] PROGMEM = "BMP180";
const char SENSORS_BME280[] PROGMEM = "BME280";
const char SENSORS_BMP280[] PROGMEM = "BMP280";
const char SENSORS_DNMS[] PROGMEM = "DNMS";"""

FIXED_FRAGMENTS = r""" #define STATIC_PREFIX "/" INTL_LANG "_s1"

const char WEB_PAGE_HEADER_HEAD[] PROGMEM =
    "<meta name='viewport' content='width=device-width'/>"
    "<meta name='theme-color' content='#3ba'>"
    "<link rel='stylesheet' href='" STATIC_PREFIX "?r=css'>"
    "</head><body>"
    "<div class='canvas'>"
    "<a href='/'>"
    "<img src='" STATIC_PREFIX "?r=logo' alt='Logo' style='height:64px;width:auto;display:block;'/></a>"
    "<div class='header-text'>";

const char WEB_PAGE_HEADER_BODY[] PROGMEM =
    "<h3 style='margin:0;color:var(--accent);'>" INTL_PM_SENSOR "</h3>"
    "<small style='color:#aaa;font-weight:600;line-height:1.3;'>ID: {id} ({macid})<br/>"
    INTL_FIRMWARE ": " SOFTWARE_VERSION_STR "/" INTL_LANG "&nbsp;(" __DATE__ ")<br/>"
    "</small></div></div><div class='content'><h4>" INTL_HOME " {n} {t}</h4>";

const char BR_TAG[] PROGMEM = "<br/>";
const char WEB_DIV_PANEL[] PROGMEM = "</div><div class='panel' id='panel{v}'>";
const char TABLE_TAG_OPEN[] PROGMEM = "<table>";
const char TABLE_TAG_CLOSE_BR[] PROGMEM = "</table>";
const char EMPTY_ROW[] PROGMEM = "<tr><td colspan='3'>&nbsp;</td></tr>";

const char WEB_CONFIG_SCRIPT[] PROGMEM =
    "<script>"
    "function setSSID(ssid){"
      "document.getElementById('wlanssid').value=ssid.innerText||ssid.textContent;"
      "document.getElementById('wlanpwd').focus();}"
    "function load_wifi_list(){"
      "var x=new XMLHttpRequest();"
      "x.open('GET','/wifi');"
      "x.onload=function(){if(x.status===200){"
        "document.getElementById('wifilist').innerHTML=x.responseText;}};"
      "x.send();}"
    "</script>";

const char WEB_IOS_REDIRECT[] PROGMEM =
    "<html><body>Redirecting..."
    "<script type=\"text/javascript\">"
    "window.location=\"http://192.168.4.1/config\";"
    "</script>"
    "</body></html>";

const char WEB_B_BR_BR[] PROGMEM = "</b><br/><br/>";
const char WEB_BRACE_BR[] PROGMEM = ")<br/>";
const char WEB_B_BR[] PROGMEM = "</b><br/>";
const char WEB_BR_BR[] PROGMEM = "<br/><br/>";
const char WEB_BR_FORM[] PROGMEM = "<br/></form>";
const char WEB_BR_LF_B[] PROGMEM = "<br/>\n<b>";
const char WEB_LF_B[] PROGMEM = "\n<b>";
const char WEB_CSV[] PROGMEM = "CSV";
const char WEB_FEINSTAUB_APP[] PROGMEM = "<a target='_blank' href='https://chillibits.com/pmapp'>Feinstaub-App</a>";
const char WEB_OPENSENSEMAP[] PROGMEM = "<a target='_blank' href='https://opensensemap.org/about'>OpenSenseMap.org</a>";
const char WEB_AIRCMS[] PROGMEM = "<a target='_blank' href='https://aircms.online/#/mission'>aircms.online</a>";
const char WEB_MADAVI[] PROGMEM = "<a target='_blank' href='https://www.madavi.de/ok-lab-stuttgart/'>Madavi.de</a>";
const char WEB_SENSORCOMMUNITY[] PROGMEM = "<a target='_blank' href='https://archive.sensor.community/00disclamer.md'>Sensor.Community</a>";
const char WEB_HTTPS[] PROGMEM = "HTTPS";
const char WEB_NBSP_NBSP_BRACE[] PROGMEM = "&nbsp;&nbsp;(";
const char WEB_REPLN_REPLV[] PROGMEM = "\"{n}\":\"{v}\",";
const char WEB_PM1[] PROGMEM = "PM1";
const char WEB_PM25[] PROGMEM = "PM2.5";
const char WEB_PM10[] PROGMEM = "PM10";
const char WEB_PM4[] PROGMEM = "PM4";
const char WEB_PM01[] PROGMEM = "PM0.1";
const char WEB_PM03[] PROGMEM = "PM0.3";
const char WEB_PM05[] PROGMEM = "PM0.5";
const char WEB_PM5[] PROGMEM = "PM5";
const char WEB_NC0k1[] PROGMEM = "NC0.1";
const char WEB_NC0k3[] PROGMEM = "NC0.3";
const char WEB_NC0k5[] PROGMEM = "NC0.5";
const char WEB_NC1k0[] PROGMEM = "NC1.0";
const char WEB_NC2k5[] PROGMEM = "NC2.5";
const char WEB_NC4k0[] PROGMEM = "NC4.0";
const char WEB_NC5k0[] PROGMEM = "NC5.0";
const char WEB_NC10[] PROGMEM = "NC10";
const char WEB_TPS[] PROGMEM = "TPS";
const char WEB_GPS[] PROGMEM = "GPS";"""

# Main Generator
def generate(html_dir, output_path):
    pages_path = os.path.join(html_dir, "pages.html")
    css_path   = os.path.join(html_dir, "style.css")

    # Read HTML
    if not os.path.exists(pages_path):
        print(f"Error: no se encuentra {pages_path}", file=sys.stderr)
        sys.exit(1)
    with open(pages_path, encoding="utf-8") as f:
        source = f.read()

    # Read CSS
    if not os.path.exists(css_path):
        print(f"[AVISO] No se encuentra {css_path}, se omite el CSS.", file=sys.stderr)
        raw_css = ""
    else:
        with open(css_path, encoding="utf-8") as f:
            raw_css = f.read()

    templates = extract_templates(source)
    if not templates:
        print("Error: no se encontró ningún <template id='WEB_*'> en pages.html", file=sys.stderr)
        sys.exit(1)

    out = []
    out.append("// ============================================================")
    out.append("// html-content.h - AUTO-GENERATED FILE")
    out.append(f"// Geneated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    out.append("// Sources: html/pages.html  +  html/style.css")
    out.append("// DO NOT EDIT THIS FILE DIRECTLY:")
    out.append("// Edit the files inside html/ and then run: generate_html_h.py")
    out.append("// ============================================================")
    out.append("")

    out.append("//Sensor names + Debug")
    out.append(STATIC_STRINGS)
    out.append("")

    # CSS minificado desde style.css
    mini_css = minify_css(raw_css)
    escaped_css = mini_css.replace('\\', '\\\\').replace('"', '\\"')
    out.append("//Style formating")
    out.append(f'const char WEB_PAGE_STATIC_CSS[] PROGMEM = "{escaped_css}";')
    out.append("")
    print(f"[OK] style.css: {len(raw_css)} → {len(mini_css)} bytes (minificado)")

    out.append("//Fixed fragments")
    out.append(FIXED_FRAGMENTS)
    out.append("")

    out.append("// HTML Constants")
    out.append("")

    ordered = [t for t in TEMPLATE_ORDER if t in templates]
    extras  = sorted(t for t in templates if t not in TEMPLATE_ORDER)

    for tmpl_id in ordered + extras:
        c_str = html_to_c_string(templates[tmpl_id])
        out.append(f"// --- <template id='{tmpl_id}'> ---")
        out.append(f"const char {tmpl_id}[] PROGMEM =")
        out.append(c_str + ";")
        out.append("")
        print(f"[OK] {tmpl_id}")

    result = '\n'.join(out) + '\n'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(result)
    print(f"\nFile generated: {output_path}  ({len(result):,} bytes)")

# ---------------------------------------------------------------------------
if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    html_dir   = os.path.join(script_dir, "html")
    output     = os.path.join(script_dir, "html-content.h")
    if not os.path.isdir(html_dir):
        print(f"Error: file not found inside html/ en {script_dir}", file=sys.stderr)
        sys.exit(1)
    generate(html_dir, output)