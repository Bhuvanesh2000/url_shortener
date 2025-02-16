require 'base64'

class UrlsController < ApplicationController
  before_action :set_url, only: %i[show]

  # GET /urls
  def index
    @urls = Url.all

    render json: @urls
  end

  # GET /urls/1
  def show
    redirect_to @url.original, allow_other_host: true
  end

  # POST /urls
  def create
    debugger

    @url = Url.find_or_initialize_by(url_params)

    if @url.save
      render json: @url, status: :created
    else
      render json: { error: @url.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /urls/1
  def update
    # if @url.update(url_params)
    #   render json: @url
    # else
    #   render json: @url.errors, status: :unprocessable_entity
    # end
  end

  # DELETE /urls/1
  # def destroy
  #   # @url.destroy!
  # end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_url
    @url = Url.find(Base64.urlsafe_decode64(params[:id]).to_i)
  end

  # Only allow a list of trusted parameters through.
  def url_params
    params.require(:url).permit(:original)
  end
end
