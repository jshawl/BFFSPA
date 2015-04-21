class FavoritesController < ApplicationController
  before_action :authenticate_user!
  # before any "favoriting" action happens, the above line will authenticate the user.
  

    def index
     @favorites = current_user.favorites
     # 'current_user' helper method retrieves the user (object) that was authenticated
    end

    # def create
    # @favorite = current_user.favorites.new(favorite_params)      
    #   if @favorite.save
    #       redirect_to @favorite                 ### auto-redirect to page of all user favorites??
    #   else render 'new'                         ## render new, or just allow user to continue scrolling through pets?                 
    #   end
    # end

end

    # private
    #   def favorite_params
    #     params.require(:user).permit(:pet)   ## ????
    #   end
    # end