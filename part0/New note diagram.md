```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    Note right of browser: Javascript code on the server responsible for this POST request.
    activate server
    server-->>browser: URL Redirected
    deactivate server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    
    activate server
    Note right of browser: Here the notes page is reloading.
    server-->>browser: HTML document
    deactivate server

     

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "Ayush was here", "date": "2024-3-17" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes. It will now display the newly submitted content in the form 
   
 ```
