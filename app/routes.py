from flask import Blueprint, render_template

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
