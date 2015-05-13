class User < ActiveRecord::Base
  has_one :user_profile
  belongs_to :shelter
  has_many :favorites
  has_many :pets, through: :favorites
  enum role: { registered: 0, employee: 1, admin:2 }
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
       :recoverable, :rememberable, :trackable, :validatable
end
