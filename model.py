import requests
from bs4 import BeautifulSoup
import re

class ECommerceQueryAnalyzer:
    def __init__(self, base_url):
        self.base_url = base_url
        self.search_input_name = None
        self.search_query_format = None

    def analyze_page(self):
        """Analyze the main page to find the search query format."""
        try:
            response = requests.get(self.base_url)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, 'html.parser')

            # Find the search form
            search_form = soup.find('form', {'method': 'get'})
            if not search_form:
                raise ValueError("No search form found on the page.")

            # Find the search input field
            search_input = search_form.find('input', {'type': 'text'})
            if not search_input:
                raise ValueError("No search input field found in the form.")

            # Get the name attribute of the input field
            self.search_input_name = search_input.get('name')
            if not self.search_input_name:
                raise ValueError("Search input field does not have a 'name' attribute.")

            # Determine the form's action URL or use base URL
            form_action = search_form.get('action', '')
            if form_action.startswith('/'):
                self.search_query_format = self.base_url.rstrip('/') + form_action + "?{name}={{query}}".format(name=self.search_input_name)
            elif form_action:
                self.search_query_format = form_action + "?{name}={{query}}".format(name=self.search_input_name)
            else:
                self.search_query_format = self.base_url + "?{name}={{query}}".format(name=self.search_input_name)

            print("Search input identified as '{}'.".format(self.search_input_name))
            print("Search query format: {}".format(self.search_query_format))

        except requests.RequestException as e:
            print(f"Error fetching the page: {e}")
        except Exception as e:
            print(f"Error analyzing the page: {e}")

    def generate_search_link(self, product_name):
        """Generate a search link for a given product name."""
        if not self.search_query_format:
            raise ValueError("Search query format not determined. Please run analyze_page first.")

        search_link = self.search_query_format.replace("{query}", requests.utils.quote(product_name))
        return search_link

if __name__ == "__main__":
    # Example usage
    base_url = input("Enter the e-commerce website URL: ")
    analyzer = ECommerceQueryAnalyzer(base_url)

    print("Analyzing the page to identify search query logic...")
    analyzer.analyze_page()

    if analyzer.search_query_format:
        while True:
            product_name = input("Enter the product name to search (or type 'exit' to quit): ")
            if product_name.lower() == 'exit':
                break

            search_link = analyzer.generate_search_link(product_name)
            print(f"Search link for '{product_name}': {search_link}")
