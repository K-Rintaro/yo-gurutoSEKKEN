class CreateLogs < ActiveRecord::Migration[5.2]
  def change
    create_table :logs do |t|
      t.string :caution
      t.references :user, foreign_key: true
      t.string :ido
      t.string :keido
      t.string :detail

      t.timestamps
    end
  end
end
