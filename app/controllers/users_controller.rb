class UsersController < ApplicationController
  before_action :require_user_logged_in, only: [:show, :destroy, :edit, :update, :hello, :edit]
  def show
    @user = User.find(params[:id])
    @logs = @user.logs.order(id: :desc).page(params[:page])
    if @user == current_user
        render "show"
    else
        redirect_to root_url
    end
  end
  
  def edit
    @user = User.find(params[:id])
    if @user == current_user
        render "edit"
    else
      redirect_to root_url
    end
  end

  def new
    @user = User.new
  end
  
  def hello
    @user = User.find_by(id: cookies[:cookieuserid])
    logger.debug(@user.inspect)
    require 'uri'
    uri = URI::parse(request.url)
    q_array = URI::decode_www_form(uri.query)
    hashdesu = Hash[q_array]
    @hello = hashdesu["code"]
  end
  
  def update
    @user = User.find(params[:id])
    logger.debug("Under is the part of it")
    logger.debug(@user.inspect)

    if @user.update(user_params)
      flash[:success] = 'Slackは正常に連携されました'
      redirect_to @user
    else
      flash.now[:danger] = 'Slackは連携されませんでした'
      redirect_to @user
    end
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
    params.require(:user).permit(:name, :email, :password, :password_confirmation, :discordid, :discordname)
  end
  
end
