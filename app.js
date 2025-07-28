/*
 * app.js
 *
 * This file contains the core logic for the Memorly MVP.  It handles
 * displaying modals, recording audio via the MediaRecorder API, and
 * collecting text notes.  The Supabase integration is stubbed out with
 * placeholder functions that log data to the console.  Replace the
 * `SUPABASE_URL` and `SUPABASE_ANON_KEY` constants with your credentials
 * and uncomment the Supabase code to enable real persistence.
 */

// Replace with your Supabase project credentials
con
  st SUPABASE_URL = '';
const SUPABASE_ANON_KEY = '';

// Uncomment and import Supabase client when ready
// import { createClient } from '@supabase/supabase-js';
// const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// DOM Elements
const recordBtn = document.getElementById('recordBtn');
const textBtn = document.getElementById('textBtn');
const recordModal = document.getElementById('recordModal');
const textModal = document.getElementById('textModal');
const startBtn = document.getElementById('startRecording');
const stopBtn = document.getElementById('stopRecording');
const saveRecordingBtn = document.getElementById('saveRecording');
const audioPlayback = document.getElementById('audioPlayback');
const closeRecord = document.getElementById('closeRecord');
const closeText = document.getElementById('closeText');
const textTitle = document.getElementById('textTitle');
const textContent = document.getElementById('textContent');
const saveTextBtn = document.getElementById('saveText');
const toast = document.getElementById('toast');

let mediaRecorder;
let audioChunks = [];
let recordedBlob;

// Show and hide modals
recordBtn.addEventListener('click', () => {
  recordModal.hidden = false;
});
textBtn.addEventListener('click', () => {
  textModal.hidden = false;
});
closeRecord.addEventListener('click', () => {
  recordModal.hidden = true;
  resetRecording();
});
closeText.addEventListener('click', () => {
  textModal.hidden = true;
  textTitle.value = '';
  textContent.value = '';
});

// Audio recording handlers
startBtn.addEventListener('click', async () => {
  if (!navigator.mediaDevices?.getUserMedia) {
    alert('Your browser does not support audio recording.');
    return;
  }
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);
    audioChunks = [];
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunks.push(e.data);
    };
    mediaRecorder.onstop = () => {
      recordedBlob = new Blob(audioChunks, { type: 'audio/webm' });
      audioPlayback.src = URL.createObjectURL(recordedBlob);
      audioPlayback.hidden = false;
      saveRecordingBtn.disabled = false;
    };
    mediaRecorder.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
  } catch (err) {
    console.error('Error accessing microphone:', err);
    alert('Could not start recording.');

  }
});

stopBtn.addEventListener('click', () => {
  if (mediaRecorder) {
    mediaRecorder.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
  }
});

saveRecordingBtn.addEventListener('click', async () => {
  if (!recordedBlob) return;
  // Generate a title based on current date/time
  const title = `Voice memory – ${new Date().toLocaleString()}`;
  // Placeholder: convert Blob to File for upload
  const fileName = `${Date.now()}.webm`;
  const file = new File([recordedBlob], fileName, { type: recordedBlob.type });
  // Upload audio to Supabase Storage
  const audioUrl = await uploadAudio(file);
  // Save record to Supabase
  const memory = {
    title: title,
    raw_content: '',
    source_type: 'voice',
    audio_url: audioUrl,
    created_at: new Date().toISOString(),
  };
  await saveMemory(memory);
  showToast('Voice memory saved!');
  recordModal.hidden = true;
  resetRecording();
});

function resetRecording() {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  saveRecordingBtn.disabled = true;
  audioPlayback.hidden = true;
  audioPlayback.src = '';
  recordedBlob = null;
}

// Text memory save
saveTextBtn.addEventListener('click', async () => {
  const title = textTitle.value.trim() || `Text memory – ${new Date().toLocaleDateString()}`;
  const content = textContent.value.trim();
  if (!content) {
    alert('Please enter some text.');
    return;
  }
  const memory = {
    title: title,
    raw_content: content,
    source_type: 'text',
    audio_url: '',
    created_at: new Date().toISOString(),
  };
  await saveMemory(memory);
  showToast('Text memory saved!');
  textModal.hidden = true;
  textTitle.value = '';
  textContent.value = '';
});

// Placeholder: Upload audio to Supabase Storage
async function uploadAudio(file) {
  console.log('Uploading audio file:', file);
  // Uncomment when Supabase client is configured
  /*
  const { data, error } = await supabase.storage.from('audio').upload(file.name, file);
  if (error) {
    console.error('Upload error:', error);
    return '';
  }
  const { data: urlData } = supabase.storage.from('audio').getPublicUrl(data.path);
  return urlData.publicUrl;
  */
  // Return a fake URL for demonstration
  return `https://example.com/audio/${file.name}`;
}

// Placeholder: Save memory to Supabase database
async function saveMemory(memory) {
  console.log('Saving memory record:', memory);
  // Uncomment when Supabase client is configured
  /*
  const { error } = await supabase.from('memories').insert([memory]);
  if (error) {
    console.error('Database insert error:', error);
  }
  */
}

// Show toast message
function showToast(message) {
  toast.textContent = message;
  toast.hidden = false;
  setTimeout(() => {
    toast.hidden = true;
  }, 5000);
}
