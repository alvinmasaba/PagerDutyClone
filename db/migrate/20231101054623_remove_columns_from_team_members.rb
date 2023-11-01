class RemoveColumnsFromTeamMembers < ActiveRecord::Migration[7.0]
  def change
    remove_column :team_members, :shift_start, :datetime
    remove_column :team_members, :shift_end, :datetime
    remove_column :team_members, :oncall, :boolean
  end
end
