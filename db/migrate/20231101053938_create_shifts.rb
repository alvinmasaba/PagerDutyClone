class CreateShifts < ActiveRecord::Migration[7.0]
  def change
    create_table :shifts do |t|
      t.datetime :shift_start
      t.datetime :shift_end
      t.references :team_member, null: false, foreign_key: true

      t.timestamps
    end
  end
end
