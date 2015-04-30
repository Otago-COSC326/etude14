class SecuredController < ApplicationController

  before_action :authenticate_account!

end