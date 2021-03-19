class LogsController < ApplicationController
  before_action :require_user_logged_in
  before_action :correct_user, only: [:create]
  def create
    @log = current_user.logs.build(log_params)
    if @log.save
      flash[:success] = '警告を記録しました'
      redirect_to root_url
    else
      @logs = current_user.logs.order(id: :desc).page(params[:page])
      flash.now[:danger] = '警告の記録に失敗しました'
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
