class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  def index
  @posts = Post.all
    respond_to do |f|
      f.html {render :index}
      f.json{render json: @posts}
    end
 end

 def new
  @post= Post.new
 end

 def create
   @post = Post.new(post_params)
   if @post.save
     redirect_to post_path(@post)
   else
     render :new
   end
 end

 def show
   @comment = Comment.new
   respond_to do |f|
     f.html {render :show}
     f.json{render json: @post}
   end
 end

 def edit
 end

 def update
  if @post.update(post_params)
    redirect_to post_path(@post)
  else
    render :edit
  end
 end

 def destroy
    @post.delete
    redirect_to posts_path
  end



  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:title, :content)
    end
end
