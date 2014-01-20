set :application, 'my_app_name'
set :scm, :copy

set :ssh_options, {
  user: "www-data"
}

set :format, :pretty
set :log_level, :debug

namespace :deploy do

  desc 'Restart application'
  task :restart do
    on roles(:app), wait: 5 do
      # Your restart mechanism here, for example:
      execute :mkdir, '-p', release_path.join('tmp')
      execute :touch, release_path.join('tmp/restart.txt')
    end
  end

  desc 'Rebuild modules using npm rebuild'
  before :updated, :rebuild_npm do
    on roles(:app) do
      execute :npm, "rebuild"
    end
  end

  after :finishing, 'deploy:cleanup'
  
end
