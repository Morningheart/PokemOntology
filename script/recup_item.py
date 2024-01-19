import requests
import json

def remove_urls(data):
    if isinstance(data, dict):
        for key in list(data.keys()):
            if key == "language" or key == "url":
                del data[key]
            else:
                remove_urls(data[key])
    elif isinstance(data, list):
        for item in data:
            remove_urls(item)
    return data

def appelType(pathType, number):
    # Example API endpoint
    api_url = pathType

    # Make the API call
    response = requests.get(api_url)

    # Check if the request was successful (status code 200)
    if response.status_code == 200:
        # Parse the JSON response
        api_data = response.json()

        del api_data["baby_trigger_for"]
        del api_data["flavor_text_entries"]
        del api_data["game_indices"]
        del api_data["held_by_pokemon"]
        del api_data["machines"]
        del api_data["names"]

        species_name = api_data["category"]["name"]
        # Add a new key-value pair with the desired structure
        api_data["category_name"] = species_name
        # Remove the old "species" key
        del api_data["category"]

        for stat_entry in api_data["attributes"]:
            # Extract the value from the "stat" key and add it as a new key-value pair
            stat_name = stat_entry["name"]
            stat_entry["attribute_name"] = stat_name
            # Remove the old "stat" key
            del stat_entry["name"]
        
        species_name = api_data["name"]
        # Add a new key-value pair with the desired structure
        api_data["item_name"] = species_name
        # Remove the old "species" key
        del api_data["name"]

        api_data = remove_urls(api_data)
        api_responses.append(api_data)

        print('Done Item', number)
    else:
        print(f"Failed to retrieve data from API. Status code: {response.status_code}")

api_url = 'https://pokeapi.co/api/v2/item/'
api_responses = []

for i in range(21,848):
    appelUrl = api_url+ str(i)+"/"
    appelType(appelUrl, i)

for i in range(877,2159):
    appelUrl = api_url+ str(i)+"/"
    appelType(appelUrl, i)

for i in range(10001,10003):
    appelUrl = api_url+ str(i)+"/"
    appelType(appelUrl, i)
    
file_path = './item/items.json'

# Write the JSON data to a file
with open(file_path, 'w') as json_file:
    json.dump(api_responses, json_file, indent=2)