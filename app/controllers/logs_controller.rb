class LogsController < ApplicationController
  before_action :require_user_logged_in
  before_action :correct_user, only: [:create]
  def create
    @log = Log.new(log_params)
    if @log.save
      respond_to do |format|
        format.json { render json: {id: @log.id, caution: @log.caution, ido: @log.ido, keido: @log.keido, detail: @log.detail } }
      end
    end
  end
  
  private

  def log_params
    params.require(:log).permit(:caution, :ido, :keido, :detail)
  end
  
  def correct_user
    @log = current_user.logs.find_by(id: params[:id])
    unless @log
      redirect_to root_url
    end
  end
  
end
