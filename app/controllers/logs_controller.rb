class LogsController < ApplicationController
  before_action :require_user_logged_in
  
  def create
    response.headers['Content-Type'] = 'text/html'
    @log = current_user.logs.build(log_params)
    if @log.save
    else
      @logs = current_user.logs.order(id: :desc).page(params[:page])
    end
  end
  
  private

  def log_params
    params.permit(:caution, :ido, :keido, :detail)
  end
  
end
