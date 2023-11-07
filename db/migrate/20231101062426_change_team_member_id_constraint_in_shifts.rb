class ChangeTeamMemberIdConstraintInShifts < ActiveRecord::Migration[7.0]
  def up
    change_column :shifts, :team_member_id, :bigint, null: true
  end

  def down
    change_column :shifts, :team_member_id, :bigint, null: false
  end
end
