class Api::V1::EmojisController < Api::V1::BaseController
  skip_before_action :require_valid_token, only: :show

  def create
    @emoji = current_user.emojis.create! emoji_params
  end

  def show
    @emoji = Emoji.find(params[:id])
  end

  def upload
    file = params[:image].tempfile
    uploader = TmpEmojiUploader.new
    uploader.store!(file)
    @url = uploader.url
  end

  private

    def emoji_params
      params.require(:emoji).permit(:name, :description, :image)
    end
end
