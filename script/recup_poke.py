import requests
import json

def remove_urls(data):
    if isinstance(data, dict):
        for key in list(data.keys()):
            if key == "version_group_details" or key == "other" or key=="versions" or key == "url":
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

        del api_data["game_indices"]

        api_data = remove_urls(api_data)


        species_name = api_data["species"]["name"]
        # Add a new key-value pair with the desired structure
        api_data["species_name"] = species_name
        # Remove the old "species" key
        del api_data["species"]

        species_name = api_data["name"]
        # Add a new key-value pair with the desired structure
        api_data["pokemon_name"] = species_name
        # Remove the old "species" key
        del api_data["name"]

        for stat_entry in api_data["stats"]:
            # Extract the value from the "stat" key and add it as a new key-value pair
            stat_name = stat_entry["stat"]["name"]
            stat_entry["stat_name"] = stat_name
            # Remove the old "stat" key
            del stat_entry["stat"]

        for stat_entry in api_data["moves"]:
            # Extract the value from the "stat" key and add it as a new key-value pair
            stat_name = stat_entry["move"]["name"]
            stat_entry["move_name"] = stat_name
            # Remove the old "stat" key
            del stat_entry["move"]

        for stat_entry in api_data["abilities"]:
            # Extract the value from the "stat" key and add it as a new key-value pair
            stat_name = stat_entry["ability"]["name"]
            stat_entry["ability_name"] = stat_name
            # Remove the old "stat" key
            del stat_entry["ability"]

        for stat_entry in api_data["types"]:
            # Extract the value from the "stat" key and add it as a new key-value pair
            stat_name = stat_entry["type"]["name"]
            stat_entry["type_name"] = stat_name
            # Remove the old "stat" key
            del stat_entry["type"]

        api_responses.append(api_data)

        print('Done Pokemon ', number)
    else:
        print(f"Failed to retrieve data from API. Status code: {response.status_code}")

api_url = 'https://pokeapi.co/api/v2/pokemon/'
api_responses = []

for i in range(1,1025):
    appelUrl = api_url+ str(i)+"/"
    appelType(appelUrl, i)

for i in range(10003,10278):
    appelUrl = api_url+ str(i)+"/"
    appelType(appelUrl, i)
    

# File path
#file_path = './types/poke_types'+str(number)+'.json'
file_path = './poke/pokemons.json'

# Write the JSON data to a file
with open(file_path, 'w') as json_file:
    json.dump(api_responses, json_file, indent=2)