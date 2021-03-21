class UsersController < ApplicationController
  before_action :require_user_logged_in, only: [:show, :destroy]
  def show
    @user = User.find(params[:id])
    @logs = @user.logs.order(id: :desc).page(params[:page])
    if @user == current_user
        render "show"
    else
        redirect_to root_url
    end
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      flash[:success] = 'ユーザを登録しました。'
      redirect_to @user
    else
      flash.now[:danger] = 'ユーザの登録に失敗しました。'
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
  
end
