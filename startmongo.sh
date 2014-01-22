# run mongo db server and sets the database directory
if [ ! -e ./data ]
then
    echo "Creating data directory"
    mkdir ./data2
fi
/Users/pascallemerrer/Documents/Dev/servers/mongodb-2.4.8/bin/mongod -dbpath ./data