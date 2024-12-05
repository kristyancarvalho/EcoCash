#include <ESP8266WiFi.h>
#include "HX711.h"
 
#define DT D3
#define SCK D2
 
HX711 escala;

unsigned long currentTime = millis();
unsigned long previousTime = 0; 
const long timeoutTime = 2000;
const char* ssid     = "Bianca Liebetanz A04s";
const char* password = "alohomora123";
const int FATOR_CALIBRACAO = -45000;
int pesoGramas;

WiFiServer server(80);

String header;

 
void setup() {
  Serial.begin(9600);
  Serial.print("Conectando com o WiFi ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi conectado.");
  Serial.println(WiFi.localIP());
  server.begin();
  
  escala.begin (DT, SCK);
  Serial.print("Leitura do Valor ADC:  ");
  Serial.println(escala.read());
  Serial.println("Nao coloque nada na balanca!");
  Serial.println("Iniciando...");
  escala.set_scale(FATOR_CALIBRACAO); 
  escala.tare(20);                
  Serial.println("Insira o item para Pesar");
}
 
void loop() {
  
  WiFiClient client = server.available();

  if (client) {
    Serial.println("Cliente conectou.");
    String currentLine = ""; 
    currentTime = millis();
    previousTime = currentTime;
    while (client.connected() && currentTime - previousTime <= timeoutTime) {
      currentTime = millis();         
      if (client.available()) {
        char c = client.read();
        Serial.write(c);
        header += c;
        if (c == '\n') {
          
          if (currentLine.length() == 0) {
            if (header.indexOf("GET /peso") >= 0) {
              if(escala.is_ready()){ 
              Serial.println("lendo peso gramas:  \t");
              pesoGramas = 1000 * escala.get_units(5), 3;
              if (pesoGramas < 0) {
                pesoGramas = 0;
              Serial.println("0.0");
              } else {
                Serial.println(pesoGramas);
              }
              delay(3500);
              }
            }
            
            // HEADER RESPONSE nao editar
            client.println("HTTP/1.1 200 OK");
            client.println("Content-type:text/plain");
            client.println("Connection:close");
            client.println("Access-Control-Allow-Origin:*");
            client.println("Access-Control-Allow-Methods:*");
            client.println("Access-Control-Allow-Headers:*");
            
            // CONTENT
            client.println(); // Inicia escopo
            client.println(pesoGramas);
            client.println(); // Fecha escopo
            
            break;
          } else {
            currentLine = "";
          }
        } else if (c != '\r') {
          currentLine += c;
        }
      }
    }

    header = "";
    client.stop();
    Serial.println("Cliente desconectou.");
  }
}