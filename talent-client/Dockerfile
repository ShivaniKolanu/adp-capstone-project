# Step 1: Start with a base image
# We're using a lightweight Node.js image (version 16) based on Alpine Linux for efficiency.
FROM node:18-alpine

# Step 2: Set the working directory
# This creates a directory called /app inside the container and sets it as the working directory.
WORKDIR /app

# Step 3: Copy package.json and package-lock.json files
# This step copies the package.json and package-lock.json into the container to install the necessary dependencies.
COPY package*.json .

# Step 4: Install dependencies
# Run npm install to install all the required dependencies for the application.
RUN npm install

# Step 5: Copy the rest of the application code
# After installing the dependencies, copy the rest of the application code from the host machine into the container.
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]


######docker commands. ######

# docker build -t talent-client:v1.0 . (creates image)

# docker images (to check what images are available)

# docker run -d -p 5173:5173  talent-client:v1.0 (creating a container/ running image.)

# docker ps (to check active containers)

# docker ps -a (to check all containers)

# docker stop container-id (stops the container)

# docker start container-id (starts the container. this is better than running all the time as running create new container everytime)

