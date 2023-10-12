FROM node:18-slim
WORKDIR /app

#copy package.json and package-lock.json from backend folder to /app
COPY server/package*.json ./

#install dependencies
RUN npm install

#copy backend folder to /app
COPY server/ ./

#set environment variables
ENV PORT=4444
ENV NODE_ENV=production
ENV MONGO_URI=mongodb+srv://user:K3i6aqljpiDf3goX@cluster0.sewht47.mongodb.net/bus_system?retryWrites=true&w=majority
ENV MONGO_URI_DEV=mongodb+srv://user:K3i6aqljpiDf3goX@cluster0.sewht47.mongodb.net/bus_system
ENV JWT_SECRET=redstream

EXPOSE 4444
CMD ["npm", "start"]