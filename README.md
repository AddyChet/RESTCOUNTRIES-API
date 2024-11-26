**REST Countries API Project**

This project is a solution to the Frontend Mentor REST Countries API challenge using only `HTML 5, CSS and Javascript`. It allows users to explore country data dynamically and interactively, with features such as filtering, searching, theme toggling, and detailed country information.

**Features**
1. Dynamic Search
Users can search for countries by name.
The search updates dynamically as users type, displaying matching results immediately.

2. Region-Based Filtering
Users can filter countries by region (e.g., Asia, Africa, Europe).
A dropdown menu dynamically updates the displayed countries based on the selected region.

3. Light/Dark Mode Toggle
The website supports both light and dark themes.
Theme preference is saved using localStorage and applied automatically on page load.

4. Country Detail Page
Clicking on a country card opens a detailed page with more information about the selected country.
The detail page is dynamically loaded using the country name passed as a query parameter (?name=countryName).

5. Back Button Functionality
A back button on the country detail page allows users to return to the previous page effortlessly.

**What I Learned**
1. Dynamic Search Implementation
    **Lesson:** How to filter and display data dynamically using input events and filtering logic.
    **Approach:**
    Initialize country data in a variable allCountriesData.
    Use `allCountriesData.filter()` to check for matches with the user's input.
    Render the matching results dynamically with `countryCard(filteredData)`.

2. Region-Based Filtering
    **Lesson:** How to filter data by a specific property (region).
    **Approach:**
    Use a `<select>` dropdown with region values.
    Dynamically generate the filtered results by using filterRegion.value in a template string.

3. Dark/Light Mode Toggling
    **Lesson:** How to use localStorage to remember user preferences across sessions.
    **Approach:**
    Save the current theme (dark or light) in localStorage.
    Check the stored value on page load and apply the corresponding theme by toggling CSS classes.

4. Dynamic Routing with Query Parameters
    **Lesson:** How to pass and retrieve data between pages using query parameters.
    **Approach:**
    Retrieve the country name from the URL using:
    `new URLSearchParams(location.search).get("name");`
    Fetch and display the country details based on the retrieved name.

5. Back Button Functionality
    **Lesson:** How to implement a simple back navigation feature.
    **Approach:**
    Use the `onclick="history.back()"` method to return to the previous page.

6. Working with APIs
    **Lesson:** Gained a deeper understanding of how to fetch, parse, and display data from an API.
    **Approach:**
    Used `fetch()` to retrieve data from the REST Countries API.
    Rendered data dynamically based on user interactions.

**Insights Gained**
1. Improved understanding of how APIs work and how to structure dynamic UI functionality.
    Gained hands-on experience with filtering, event handling, and dynamic rendering in JavaScript.
2. Learned how to handle user preferences and ensure a seamless user experience with    persistent settings.
