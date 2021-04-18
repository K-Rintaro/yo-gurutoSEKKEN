class AddDiscordnameToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :discordname, :string
  end
end
