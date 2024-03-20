from flask import Blueprint, render_template, jsonify, request

bp = Blueprint('main', __name__)

@bp.route('/')
def index():
    return render_template('base.html')

@bp.route('/data')
def data():
    return render_template('data.html')

@bp.route('/analysis')
def analysis():
    return render_template('analysis.html')

@bp.route('/settings')
def settings():
    return render_template('settings.html')

@bp.route('/api/posture-data')
def posture_data():
    interval = request.args.get('interval', 'day')

    # Example data for each interval. Replace with actual data fetching logic.
    if interval == 'day':
        data = {
            'usageTime': 8,  # hours
            'goodPosturePercentage': 75,  # percent
            'alerts': 5,  # count
            'labels': ['08:00', '10:00', '12:00', '14:00', '16:00'],
            'correctSitting': [1, 2, 1.5, 2, 1.5],
            'reminders': [1, 0, 1, 0, 1]
        }
    elif interval == 'week':
        data = {
            'usageTime': 40,  # hours
            'goodPosturePercentage': 80,  # percent
            'alerts': 15,  # count
            'labels': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            'correctSitting': [8, 8, 7, 9, 8],
            'reminders': [3, 2, 4, 3, 3]
        }
    elif interval == 'month':
        data = {
            'usageTime': 160,  # hours
            'goodPosturePercentage': 78,  # percent
            'alerts': 60,  # count
            'labels': ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            'correctSitting': [32, 35, 33, 30],
            'reminders': [12, 15, 18, 15]
        }
    else:
        # Fallback data in case the interval parameter is missing or invalid
        data = {
            'usageTime': 0,  # hours
            'goodPosturePercentage': 0,  # percent
            'alerts': 0,  # count
            'labels': [],
            'correctSitting': [],
            'reminders': []
        }

    return jsonify(data)