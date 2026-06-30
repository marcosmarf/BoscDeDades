**[English](README.en.md) | [Català](README.md) | [Español](README.es.md)**

# BoscDeDades
Build, measure, and improve your city: join the citizen network safeguarding our streets' environmental health through open technology.

## 🤝 Credits & Acknowledgements

This project is a collaborative effort that stands on the shoulders of giants. We believe in the power of open knowledge and community-driven science.

### 🏗️ Original Foundations
Special thanks to the pioneers whose work made this project possible:
* **[Sensor.Community / AirRohr](https://sensor.community/):** For the global infrastructure and the original ESP8266-based design.
* **[Helmut Bitter (DNMS)](https://github.com/hbitter/DNMS):** For the groundbreaking research and firmware on Digital Noise Measurement Systems.
* **The Citizen Science Community:** For the constant feedback and testing that keeps these tools evolving.

### 👥 The BoscDeDades Team
Our team of 4 coordinators has integrated these technologies to create a dedicated toolkit for schools and civic centers:
* **[David Otero]:** Hardware Integration & I2C Bus Architecture.
* **[JAvier Rodríguez]:** Pedagogical Lead & Educational Unit Design.
* **[Marco A. Rodríguez]:** Software Development & Web Dashboard.
* **[Marco A. Rodríguez]:** Community Outreach & Field Testing.

### 🌟 Project Origin
This specific fork was developed to improve the following features of the original project:
- Support for extended I2C communication (P82B715PN) and modular hardware configurations.

### 📁 Project Structure
In the "Firmware" folder you will find three subfolders:
- "FirmwareTraduit + AP Custom": the final firmware pre-loaded on the BoscDeDades environmental sensors.
- "FirmwareTraduit+ESP8266-SensorComunity": the original Sensor.Community firmware with Catalan translation.
- "Teensy4-dnms-custom": the original noise sensor firmware with our modifications to lighten the code and improve efficiency.

Inside these folders you can find the compiled builds and source code for each.

In the "Hardware" folder you will find the PCB versions we use for AirRohr and DNMS.

In the "web" folder you will find the source code for the Bosc de Dades website and the provisional data reception server. In the "web/assets/educational-kit" subfolder you can find the educational units used in schools and high schools.

In the "LlistaMaterials.md" file you will find a list of the materials used, descriptions, and links to where they can be found.