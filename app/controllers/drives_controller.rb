class DrivesController < ApplicationController
  before_action :require_user_logged_in
  def index
    @user = current_user
    response.headers['Content-Type'] = 'text/html'
  end
end
``