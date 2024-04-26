# PosturePerfect Dashboard 🖥️

## Project Overview 📖

The PosturePerfect Dashboard is a web application designed to monitor and report on user posture and activity. It provides visual analytics in the form of charts and metrics, offering users insights into their daily posture habits and alert trends.

### Features 

- Real-time posture tracking data visualization.
- Interactive charts displaying usage time and alert trends.
- Summary cards for quick statistics overview (Usage Time, Good Posture Percentage, Alerts).
- Responsive design for optimal viewing on all device sizes.

## Getting Started 🚀

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following tools installed:

- A web browser (e.g., Chrome, Firefox, Safari).
- A text editor or IDE (e.g., VSCode, Sublime Text, Atom).
- Basic knowledge of HTML, CSS, and JavaScript.
- Make sure you have installed `flask` and `flask-socketio`.

### Installation

1. Clone the repository to your local machine using:

```git clone https://github.com/carelessty/postureperfect.git```

2. Navigate to the project directory:

```cd postureperfect```

3. Start the server:
   ```
   flask run
   ```

### Usage

Access the application via your web browser at `127.0.0.1:5000`.
   
### Built With
- HTML
- CSS
- Python
- JavaScript
- Chart.js
- Flask
- Bootstrap


## Current Limitations ⚠️

- **UDP Communication Issue** 📡: There is a known issue with UDP communication that necessitates the use of an older version of the monitor webpage. Further updates on this will be provided.
- **Analyse Module** 🚧: Currently in a demo phase using example data, the full functionality of this module is pending implementation.

## Additional Information ℹ️

The code for the hardware component is available in a separate repository. Ensure to check that for a comprehensive understanding of the entire system.

## Contributions 👐

Contributions are welcome! Please feel free to submit pull requests or open issues to suggest improvements or report bugs.
