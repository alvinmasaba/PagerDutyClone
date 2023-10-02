class CreateIncidents < ActiveRecord::Migration[7.0]
  def change
    create_table :incidents do |t|
      t.string :urgency
      t.boolean :triggered
      t.boolean :acknowledged
      t.boolean :resolved
      t.text :description
      t.references :assigned_to, foreign_key: { to_table: :team_members }

      t.timestamps
    end
  end
end
