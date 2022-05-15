first_song="";
second_song="";
rightWrist_x = 0;
rightWrist_y = 0;
leftWrist_x = 0;
leftWrist_y = 0;
scoreleftWrist = 0;
scorerightWrist = 0;
song_first = "";
song_second = "";

function setup(){
    canvas=createCanvas(600,550);
    video=createCapture(VIDEO);
    video.hide();
canvas.center();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotposes);
}

function preload(){
    first_song = loadSound("Lost Sky - Where We Started (feat. Jex) [NCS Release].mp3");
    second_song = loadSound("Debris & RudeLies - Animal (feat. Jex) [NCS Release].mp3");
}

function draw(){
    image(video,0,0,600,550);

    fill("#00ff00");
    stroke("#ff0000");

    song_first = first_song.isPlaying();
    console.log(song_first);

    song_second = second_song.isPlaying();
    console.log(song_second);

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        second_song.stop();
        if(song_first == false){
            first_song.play();
        }
        else{
            console.log("Song Name: NCS :Lost Sky");
            document.getElementById("song_id").innerHTML = "Song Name: NCS :Lost Sky";
        }
    }

    if(scorerightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        first_song.stop();
        if(song_second == false){
            second_song.play();
        }
        else{
            console.log("Song Name: NCS Animals");
            document.getElementById("song_id").innerHTML = "Song Name: NCS Animals";
        }
    }
}

function modelLoaded(){
    console.log("poseNet has been initialized.");
}

function gotposes(results){
    if(results.length > 0){
        console.log(results);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftWrist_x = results[0].pose.leftWrist.x;
        leftWrist_y = results[0].pose.leftWrist.y;
        console.log("leftWrist_x = "+leftWrist_x+" leftWrist_y = "+leftWrist_y);

        rightWrist_x = results[0].pose.rightWrist.x;
        rightWrist_y = results[0].pose.rightWrist.y;
        console.log("rightWrist_x = "+rightWrist_x+" rightWrist_y = "+rightWrist_y);
    }
}