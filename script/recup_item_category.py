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

        del api_data["names"]
        del api_data["items"]

        species_name = api_data["pocket"]["name"]
        # Add a new key-value pair with the desired structure
        api_data["pocket_name"] = species_name
        # Remove the old "species" key
        del api_data["pocket"]

        species_name = api_data["name"]
        # Add a new key-value pair with the desired structure
        api_data["item_category_name"] = species_name
        # Remove the old "species" key
        del api_data["name"]


        api_data = remove_urls(api_data)
        api_responses.append(api_data)

        print('Done Item Category', number)
    else:
        print(f"Failed to retrieve data from API. Status code: {response.status_code}")

api_url = 'https://pokeapi.co/api/v2/item-category/'
api_responses = []

for i in range(1,55):
    appelUrl = api_url+ str(i)+"/"
    appelType(appelUrl, i)
    
file_path = './item/item_categories.json'

# Write the JSON data to a file
with open(file_path, 'w') as json_file:
    json.dump(api_responses, json_file, indent=2)