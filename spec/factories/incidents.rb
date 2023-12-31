FactoryBot.define do
  factory :incident do
    urgency { Faker::Lorem.word }
    triggered { Faker::Boolean.boolean }
    acknowledged { Faker::Boolean.boolean }
    resolved { Faker::Boolean.boolean }
    description { Faker::Lorem.sentence }
  end
end