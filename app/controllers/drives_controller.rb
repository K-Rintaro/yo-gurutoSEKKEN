class DrivesController < ApplicationController
  before_action :require_user_logged_in
  def index
    @user = current_user
  end
end
