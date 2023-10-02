class CreateTeamMembers < ActiveRecord::Migration[7.0]
  def change
    create_table :team_members do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :number
      t.string :avatar
      t.boolean :oncall
      t.datetime :shift_start
      t.datetime :shift_end

      t.timestamps
    end
  end
end
