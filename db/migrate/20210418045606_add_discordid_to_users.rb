class AddDiscordidToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :discordid, :string
  end
end
