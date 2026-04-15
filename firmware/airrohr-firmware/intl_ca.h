/*
 * airRohr firmware
 * Copyright (C) 2016-2018 Code for Stuttgart a.o.
 *
 * Catalan translations
 *
 * Texts should be as short as possible
 */

#define INTL_LANG "CA"
#define INTL_PM_SENSOR "Sensor de soroll DNMS"
const char INTL_CONFIGURATION[] PROGMEM = "Configuració";
#define INTL_WIFI_SETTINGS "Dades WiFi"
#define INTL_WIFI_WITH_PWD "Amb contrasenya WLAN"
#define INTL_WIFI_NETWORKS "Carregant xarxes WiFi ..."
#define INTL_LANGUAGE "Idioma"
const char INTL_NO_NETWORKS[] PROGMEM = "No s'ha trobat cap xarxa";
const char INTL_NETWORKS_FOUND[] PROGMEM = "Xarxes trobades: ";
const char INTL_AB_HIER_NUR_ANDERN[] PROGMEM = "A partir d'aquí, modifiqueu només si realment sabeu què feu";
const char INTL_CAREFUL_ATTENTION[] PROGMEM = "Comproveu acuradament els canvis als pins I²C!";
const char INTL_SAVE[] PROGMEM = "Desar";
const char INTL_SENSORS[] PROGMEM = "Sensors";
const char INTL_START[] PROGMEM = "Després d'un reinici:";
const char INTL_START_ZWEI[] PROGMEM = "Atenció! L'accés al servidor web local no és possible durant l'espera!:";
const char INTL_START_ON_FULL_MINUTE[] PROGMEM = "Inici de les mesures en el minut en punt";
const char INTL_START_ON_FULL_HOUR[] PROGMEM = "Inici de les mesures en l'hora en punt";
const char INTL_SENSOR_CYCLIC_RESTART[] PROGMEM = "Reinici cíclic del sensor";
const char INTL_SENSOR_CYCLIC_RESTART_TIME[] PROGMEM = "Temps de cicle per al reinici en h";
const char INTL_DNMS_SENSOR[] PROGMEM = "Sensor de soroll DNMS";
const char INTL_MORE_SENSORS[] PROGMEM = "Més sensors";
const char INTL_SDS011[] PROGMEM = "SDS011 ({pm})";
const char INTL_PMS[] PROGMEM = "Plantower PMS(1,3,5,6,7)003 ({pm})";
const char INTL_HPM[] PROGMEM = "Honeywell PM ({pm})";
const char INTL_NPM[] PROGMEM = "Tera Sensor Next PM ({pm})";
const char INTL_NPM_FULLTIME[] PROGMEM = "Next PM temps complet";
const char INTL_IPS[] PROGMEM = "IPS-7100 PM ({pm})";
const char INTL_SEN5X[] PROGMEM = "Sensirion SEN5X ({pm}, {t}, {h}, {voc}, {nox})";
const char INTL_SPS30[] PROGMEM = "Sensirion SPS30 ({pm})";
const char INTL_PPD42NS[] PROGMEM = "PPD42NS ({pm})";
const char INTL_DHT22[] PROGMEM = "DHT22 ({t}, {h})";
const char INTL_HTU21D[] PROGMEM = "HTU21D ({t}, {h})";
const char INTL_BMP180[] PROGMEM = "BMP180 ({t}, {p})";
const char INTL_BMX280[] PROGMEM = "BME280 ({t}, {h}, {p}), BMP280 ({t}, {p})";
const char INTL_SHT3X[] PROGMEM = "SHT3X ({t}, {h})";
const char INTL_SCD30[] PROGMEM = "SCD30 ({t}, {h}, CO₂)";
const char INTL_SCD4X[] PROGMEM = "SCD4X ({t}, {h}, CO₂)";
const char INTL_SCD4X_LOW_POWER[] PROGMEM = "Mesures SCD4X amb baix consum d'energia";
const char INTL_DS18B20[] PROGMEM = "DS18B20 ({t})";
const char INTL_I2C_GPIO_SCL[] PROGMEM = "Pin GPIO I²C SCL";
const char INTL_I2C_GPIO_SDA[] PROGMEM = "Pin GPIO I²C SDA";
const char INTL_DNMS[] PROGMEM = "DNMS ({l_a})";
const char INTL_DNMS_Z[] PROGMEM = "DNMS ({l_z})";
const char INTL_DNMS_SPECTRUM[] PROGMEM = "Espectre de freqüència DNMS ponderació A";
const char INTL_DNMS_SPECTRUM_Z[] PROGMEM = "Espectre de freqüència DNMS ponderació Z";
const char INTL_DNMS_2nd_INTERVAL[] PROGMEM = "2n interval de mesura DNMS (LAeq)";
const char INTL_DNMS_2nd_INTERVAL_Z[] PROGMEM = "2n interval de mesura DNMS (LZeq)";
const char INTL_DNMS_2nd_SPECTRUM[] PROGMEM = "Espectre de freq. del 2n interval de mesura DNMS ponderació A";
const char INTL_DNMS_2nd_SPECTRUM_Z[] PROGMEM = "Espectre de freq. del 2n interval de mesura DNMS ponderació Z";
const char INTL_DNMS_2nd_INTERVAL_TIME[] PROGMEM = "2n interval de mesura DNMS en segons";
const char INTL_DNMS_2nd_THRESHOLD[] PROGMEM = "Llindar LAeq del 2n interval de mesura DNMS&nbsp;en&nbsp;dB(A)";
const char INTL_DNMS_2nd_NUMBER_MEASUREMENTS[] PROGMEM = "Nombre de mesures del 2n interval DNMS un cop superat el llindar";
const char INTL_DNMS_2nd_SWITCH_OUTPUT[] PROGMEM = "Commutar sortida al 2n interval de mesura DNMS si se supera el llindar";
const char INTL_DNMS_2nd_GPIO_PIN[] PROGMEM = "Pin GPIO a commutar al 2n interval de mesura DNMS";
const char INTL_DNMS_CORRECTION[] PROGMEM = "Valor de correcció DNMS&nbsp;en&nbsp;dB(A)";
const char INTL_DNMS_MICROPHONE[] PROGMEM = "Quin micròfon està connectat al sensor DNMS? (seleccioneu-ne només un)";
const char INTL_DNMS_ICS43434[] PROGMEM = "ICS-43434";
const char INTL_DNMS_IM72D128[] PROGMEM = "IM72D128";
const char INTL_TEMP_CORRECTION[] PROGMEM = "Valor de correcció en °C";
const char INTL_HEIGHT_ABOVE_SEALEVEL[] PROGMEM = "Alçada sobre el nivell del mar (m)";
const char INTL_PRESSURE_AT_SEALEVEL[] PROGMEM = "Pressió atmosfèrica al nivell del mar";
const char INTL_NEO6M[] PROGMEM = "GPS (NEO 6M)";
const char INTL_BASICAUTH[] PROGMEM = "Activar BasicAuth";
#define INTL_REPORT_ISSUE "Informa d'un problema"

const char INTL_FS_WIFI_DESCRIPTION[] PROGMEM = "Nom del WiFi del sensor en mode configuració";
const char INTL_FS_WIFI_NAME[] PROGMEM = "Nom";
const char INTL_MORE_SETTINGS[] PROGMEM = "Més configuracions";
const char INTL_AUTO_UPDATE[] PROGMEM = "Actualització automàtica";
const char INTL_USE_BETA[] PROGMEM = "Carrega versions Beta";
const char INTL_DISPLAY[] PROGMEM = "OLED SSD1306";
const char INTL_SH1106[] PROGMEM = "OLED SH1106";
const char INTL_FLIP_DISPLAY[] PROGMEM = "Girar pantalla OLED 180°";
const char INTL_LCD1602_27[] PROGMEM = "LCD 1602 (I2C: 0x27)";
const char INTL_LCD1602_3F[] PROGMEM = "LCD 1602 (I2C: 0x3F)";
const char INTL_LCD2004_27[] PROGMEM = "LCD 2004 (I2C: 0x27)";
const char INTL_LCD2004_3F[] PROGMEM = "LCD 2004 (I2C: 0x3F)";
const char INTL_DISPLAY_WIFI_INFO[] PROGMEM = "Mostra informació WiFi";
const char INTL_DISPLAY_DEVICE_INFO[] PROGMEM = "Mostra informació del dispositiu";
const char INTL_POWERSAVE[] PROGMEM = "Estalvi d'energia?";

#define INTL_STATIC_IP_TEXT "Configuració d'adreça IP estàtica (cal omplir tots els camps)"
const char INTL_STATIC_IP[] PROGMEM = "Adreça IP";
const char INTL_STATIC_SUBNET[] PROGMEM = "Subxarxa";
const char INTL_STATIC_GATEWAY[] PROGMEM = "Porta d'enllaç";
const char INTL_STATIC_DNS[] PROGMEM = "Servidor DNS";
const char INTL_NTP_SERVER_1[] PROGMEM = "Servidor de temps NTP 1";
const char INTL_NTP_SERVER_2[] PROGMEM = "Servidor de temps NTP 2";
const char INTL_NTP_SERVER_TEXT[] PROGMEM = "Canviar servidor de temps NTP";

const char INTL_DEBUG_LEVEL[] PROGMEM = "Nivell&nbsp;de&nbsp;depuració";
const char INTL_MEASUREMENT_INTERVAL[] PROGMEM = "Interval de mesura";
const char INTL_DURATION_ROUTER_MODE[] PROGMEM = "Durada&nbsp;mode&nbsp;router";
const char INTL_MORE_APIS[] PROGMEM = "Més APIs";
const char INTL_SEND_TO_OWN_API[] PROGMEM = "Envia a una API pròpia";
const char INTL_SERVER[] PROGMEM = "Servidor";
const char INTL_PATH[] PROGMEM = "Ruta";
const char INTL_PORT[] PROGMEM = "Port";
const char INTL_USER[] PROGMEM = "Usuari";
const char INTL_PASSWORD[] PROGMEM = "Contrasenya";
const char INTL_MQTT_MEASUREMENT[] PROGMEM = "Mesura MQTT";
const char INTL_MQTT_MAIN_TOPIC[] PROGMEM = "Tema principal MQTT";
const char INTL_ID_AS_MQTT_SUB_TOPIC[] PROGMEM = "ID del sensor com a subtema MQTT";
const char INTL_INFLUX_MEASUREMENT[] PROGMEM = "Mesura";
const char INTL_SEND_TO[] PROGMEM = "Envia a {v}";
const char INTL_READ_FROM[] PROGMEM = "Llegeix de {v}";
const char INTL_SENSOR_IS_REBOOTING[] PROGMEM = "El sensor s'està reiniciant.";
const char INTL_RESTART_DEVICE[] PROGMEM = "Reinicia el dispositiu";
const char INTL_DELETE_CONFIG[] PROGMEM = "Esborrar Config.json";
const char INTL_RESTART_SENSOR[] PROGMEM = "Reinicia el sensor";
#define INTL_HOME "Resum"
#define INTL_BACK_TO_HOME "Torna a la pàgina d'inici"
const char INTL_CURRENT_DATA[] PROGMEM = "Valors actuals";
const char INTL_DEVICE_STATUS[] PROGMEM = "Estat del dispositiu";
#define INTL_ACTIVE_SENSORS_MAP "Mapa de sensors actius (enllaç extern)"
#define INTL_CONFIGURATION_DELETE "Esborrar configuració"
#define INTL_CONFIGURATION_REALLY_DELETE "Estàs segur que vols esborrar la configuració?"
#define INTL_DELETE "Esborrar"
#define INTL_CANCEL "Cancel·lar"
#define INTL_REALLY_RESTART_SENSOR "Estàs segur que vols reiniciar el sensor?"
#define INTL_RESTART "Reiniciar"
const char INTL_SAVE_AND_RESTART[] PROGMEM = "Desar i reiniciar";
#define INTL_FIRMWARE "Firmware"
const char INTL_DEBUG_SETTING_TO[] PROGMEM = "Estableix la depuració a";
#define INTL_NONE "Cap"
#define INTL_ERROR "Errors"
#define INTL_WARNING "Advertències"
#define INTL_MIN_INFO "Info. mín."
#define INTL_MED_INFO "Info. mitj."
#define INTL_MAX_INFO "Info. màx."
#define INTL_CONFIG_DELETED "Config.json esborrat"
#define INTL_CONFIG_CAN_NOT_BE_DELETED "No s'ha pogut esborrar Config.json"
#define INTL_CONFIG_NOT_FOUND "No s'ha trobat Config.json"
const char INTL_TIME_TO_FIRST_MEASUREMENT[] PROGMEM = "Falten {v} segons per a la primera mesura (1r interval de mesura).";
const char INTL_TIME_SINCE_LAST_MEASUREMENT[] PROGMEM = " segons des de l'última mesura (1r interval de mesura).";
const char INTL_PARTICLES_PER_LITER[] PROGMEM = "Partícules/Litre";
const char INTL_PARTICULATE_MATTER[] PROGMEM = "Partícules en suspensió (Feinstaub)";
const char INTL_TEMPERATURE[] PROGMEM = "Temperatur";
const char INTL_HUMIDITY[] PROGMEM = "Humitat relativa";
const char INTL_PRESSURE[] PROGMEM = "Pressió atmosfèrica";
const char INTL_VOC[] PROGMEM = "Compostos orgànics volàtils (VOC)";
const char INTL_NOX[] PROGMEM = "Òxids de nitrogen (NOx)";
const char INTL_DEW_POINT[] PROGMEM = "Punt de rosada";
const char INTL_CO2_PPM[] PROGMEM = "ppm CO₂";
const char INTL_LEQ_A[] PROGMEM = "LAeq";
const char INTL_LA_MIN[] PROGMEM = "LA min";
const char INTL_LA_MAX[] PROGMEM = "LA max";
const char INTL_LEQ_Z[] PROGMEM = "LZeq";
const char INTL_LZ_MIN[] PROGMEM = "LZ min";
const char INTL_LZ_MAX[] PROGMEM = "LZ max";
const char INTL_LEQ_A_2nd[] PROGMEM = "LAeq_2n";
const char INTL_LA_MIN_2nd[] PROGMEM = "LA min_2n";
const char INTL_LA_MAX_2nd[] PROGMEM = "LA max_2n";
const char INTL_LEQ_Z_2nd[] PROGMEM = "LZeq_2n";
const char INTL_LZ_MIN_2nd[] PROGMEM = "LZ min_2n";
const char INTL_LZ_MAX_2nd[] PROGMEM = "LZ max_2n";
const char INTL_LATITUDE[] PROGMEM = "Latitud";
const char INTL_LONGITUDE[] PROGMEM = "Longitud";
const char INTL_ALTITUDE[] PROGMEM = "Altitud";
const char INTL_TIME_UTC[] PROGMEM = "Temps (UTC) ";
const char INTL_SIGNAL_STRENGTH[] PROGMEM = "Senyal";
const char INTL_SIGNAL_QUALITY[] PROGMEM = "Qualitat";
#define INTL_NUMBER_OF_MEASUREMENTS "Nombre de mesures"
#define INTL_TIME_SENDING_MS "Durada de la transmissió"
#define INTL_SENSOR "Sensor"
#define INTL_PARAMETER "Paràmetre"
#define INTL_VALUE "Valor"

#include "./airrohr-logo-common.h"