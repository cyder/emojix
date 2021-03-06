class Api::V1::DownloadController < Api::V1::BaseController
  include ActionController::Streaming
  include Zipline

  skip_before_action :require_valid_token, if: -> {
    request.headers[:Authorization].blank?
  }
  ZIP_FILENAME = "emojis.zip".freeze

  def index
    emoji = Emoji.find_with_logging!(params[:emoji_id], current_user)
    file = emoji.image.slack.file
    if defined?(CarrierWave::Storage::Fog::File) && file.is_a?(CarrierWave::Storage::Fog::File)
      data = OpenURI.open_uri(file.url)
    elsif defined?(CarrierWave::SanitizedFile) && file.is_a?(CarrierWave::SanitizedFile)
      data = file.path
    end
    send_file data, filename: emoji.image.file.filename
  end

  def zip
    emoji_ids = params[:emojis] || []
    emojis = DownloadLog.transaction do
      emoji_ids.map do |emoji_id|
        Emoji.find_with_logging!(emoji_id, current_user)
      end
    end

    files = get_slack_image_files(emojis)
    zipline(files, ZIP_FILENAME)
  end

  private

    def get_slack_image_files(emojis)
      files = emojis.group_by(&:name).map do |key, value|
        value.map.with_index(1) do |emoji, i|
          image = emoji.image.slack
          extension = image.file.extension
          filename = if value.size == 1
                       "#{key}.#{extension}"
                     else
                       "#{key}(#{i}).#{extension}"
                     end
          [image, filename]
        end
      end
      files.flatten(1)
    end
end
