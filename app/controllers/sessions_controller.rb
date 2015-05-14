class SessionsController < Devise::SessionsController
   after_filter :set_csrf_headers, only: [:create, :destroy]
  respond_to :json

  protected
  def set_csrf_headers
    #send new CSRF Tokens with AJAX login. this was a pain
    #needed to use string interpolation since it was throwing an error of cant use :split on token
    #that was double pain
    #all of my life is pain

     if self.request.format.symbol == :json
      response.headers['X-CSRF-Param'] = "#{request_forgery_protection_token}" if protect_against_forgery?
      response.headers['X-CSRF-Token'] = "#{form_authenticity_token}" if protect_against_forgery?
    end
  end

end