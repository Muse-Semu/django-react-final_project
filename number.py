# import phonenumbers

# from phonenumbers import geocoder

# myPhone = '+251 924383770'

# samNumber = phonenumbers.parse(myPhone)

# yourLocation = geocoder.description_for_number(samNumber,'en')

# print(yourLocation)

# from geopy.geocoders import Nominatim
 
# # calling the Nominatim tool
# loc = Nominatim(user_agent="GetLoc")
 
# # entering the location name
# getLoc = loc.geocode("Gondar")
 
# # printing address
# print(getLoc.address)
# # printing latitude and longitude
# print("Latitude = ", getLoc.latitude, "\n")
# print("Longitude = ", getLoc.longitude)

# from digidevice import location

# loc = location.Location()

# print(loc.position)

import http.client
import json
import random
tnx_number = random.randint(100000,999999)
conn = http.client.HTTPSConnection("api.chapa.co")
payload = json.dumps({
  "amount": "900",
  "currency": "ETB",
  "email": "abebech_bekele@gmail.com",
  "first_name": "Bilen",
  "last_name": "Gizachew",
  "phone_number": "0912345678",
  "tx_ref": f'gebeta-{tnx_number}',
  "callback_url": "https://webhook.site/077164d6-29cb-40df-ba29-8a00e59a7e60",
  "return_url": "https://www.google.com/",
  "customization[title]": "Payment for my favourite merchant",
  "customization[description]": "I love online payments"
})
headers = {
  'Authorization': 'Bearer CHASECK_TEST-9eNvovB1Zhx8s16HqrQIUl67luPRFxn7',
  'Content-Type': 'application/json'
}

try:
  conn.request("POST", "/v1/transaction/initialize", payload, headers)
  res = conn.getresponse()
  data = res.read()
  print(data.decode("utf-8"))
except:
  print('Not connetced to the network')