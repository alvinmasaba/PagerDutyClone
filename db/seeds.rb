# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" })
#   Character.create(name: "Luke", movie: movies.first)
# Helper method to check if a worker has a shift on a specific day
def shift_on_this_day?(worker_id, day_date)
  Shift.exists?(team_member_id: worker_id, shift_start: day_date.beginning_of_day..day_date.end_of_day)
end

Shift.destroy_all
Incident.destroy_all
TeamMember.destroy_all

# Create 5 team members
20.times do
  TeamMember.create!(
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    email: Faker::Internet.email,
    number: Faker::PhoneNumber.cell_phone_in_e164,
  )
end

# Fetch all team member IDs
team_member_ids = TeamMember.pluck(:id)

# Create 10 incidents
10.times do
  Incident.create!(
    urgency: ['HIGH', 'MEDIUM', 'LOW'].sample,
    triggered: Faker::Boolean.boolean,
    acknowledged: Faker::Boolean.boolean,
    resolved: Faker::Boolean.boolean,
    description: Faker::Lorem.sentence,
    assigned_to_id: team_member_ids.sample
  )
end

# Initialize a hash to track worker hours
worker_hours = Hash.new(0)

# Initialize a list of days in the week
days_of_week = (0..6).to_a

# Calculate the start and end dates for the current week
today = Date.today
start_of_week = today.beginning_of_week
end_of_week = today.end_of_week

# Define the shift blocks
shift_blocks = [
  { start_time: "00:00", end_time: "04:00" },
  { start_time: "04:00", end_time: "08:00" },
  { start_time: "08:00", end_time: "16:00" },
  { start_time: "16:00", end_time: "24:00" }
]

# Create shifts for each day of the week
(0..6).each do |day_index|
  # Calculate the day's date
  day_date = start_of_week + day_index.days

  shift_blocks.each do |block|
    # Determine the number of active workers needed for this block
    active_workers_needed = 3
    
    while active_workers_needed.positive?
      worker_id = team_member_ids.sample

     # Convert start_time and end_time to DateTime objects
      start_time = block[:start_time].to_i
      end_time = block[:end_time].to_i

      # Calculate the length of the shift in hours
      shift_length = (end_time - start_time.to_i)

      # Check if the worker's total hours plus shift length is less than or equal to 40
      if ((worker_hours[worker_id] || 0) + shift_length <= 40) && !shift_on_this_day?(worker_id, day_date)
        # Calculate shift start and end times
        shift_start = day_date + block[:start_time].to_i.hours
        shift_end = day_date + block[:end_time].to_i.hours
        
        begin
          Shift.create!(
            shift_start: shift_start,
            shift_end: shift_end,
            team_member_id: worker_id
          )
          
          puts "Shift from #{shift_start} to #{shift_end} was created and assigned to Employee ##{worker_id}."

        rescue ActiveRecord::RecordInvalid => e
          puts "Error creating shift for employee #{worker_id} from #{shift_start} to #{shift_end}: #{e.message}"
        end

        # Update worker hours
        worker_hours[worker_id] += (end_time - start_time)
        puts "#{worker_hours}"
        active_workers_needed -= 1
      end
    end
  end
end
