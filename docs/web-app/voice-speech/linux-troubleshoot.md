# Linux Speech Synthesis Troubleshooting

The app uses the Web Speech API (`speechSynthesis`) to pronounce words. On Linux, this requires `speech-dispatcher` and a voice backend to be installed. Without it, clicking the speaker icon produces no sound.

## Quick test

Open your browser's dev console on the app and run:

```js
speechSynthesis.getVoices().length
```

If it returns `0`, the TTS backend is missing or not configured.

---

## Installation by distro

### Arch Linux (including Garuda, Manjaro, EndeavourOS)

```bash
sudo pacman -S speech-dispatcher espeak-ng
systemctl --user enable --now speech-dispatcher.socket
```

The socket is enabled automatically on install. If it still doesn't work:

```bash
systemctl --user start speech-dispatcher.service
```

### Debian / Ubuntu / Linux Mint / Pop!_OS

```bash
sudo apt update
sudo apt install speech-dispatcher espeak-ng
```

After install, restart your browser.

### Fedora / RHEL / CentOS

```bash
sudo dnf install speech-dispatcher espeak-ng
sudo systemctl start speechd
sudo systemctl enable speechd
```

Then restart your browser.

### openSUSE

```bash
sudo zypper install speech-dispatcher espeak-ng
sudo systemctl start speech-dispatcherd
sudo systemctl enable speech-dispatcherd
```

Then restart your browser.

### NixOS

Add to `/etc/nixos/configuration.nix`:

```nix
services.speech-dispatcher = {
  enable = true;
};
```

Then rebuild:

```bash
sudo nixos-rebuild switch
```

---

## Verification

After installation, run in terminal:

```bash
spd-say "Hello, this is a test"
```

If you hear sound, speech-dispatcher works. Restart your browser completely and the app's pronunciation should function.

## Voice quality

The default `espeak-ng` voice sounds robotic. For natural-sounding pronunciation suitable for language learning, install Piper TTS:

### Piper TTS (neural, high quality)

**Arch / Garuda:**
```bash
yay -S piper-tts-bin
mkdir -p ~/.local/share/piper-voices
wget -P ~/.local/share/piper-voices https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/amy/medium/en_US-amy-medium.onnx
wget -P ~/.local/share/piper-voices https://huggingface.co/rhasspy/piper-voices/resolve/main/en/en_US/amy/medium/en_US-amy-medium.onnx.json
wget -P ~/.local/share/piper-voices https://huggingface.co/rhasspy/piper-voices/resolve/main/pl/pl_PL/mc_speech/medium/pl_PL-mc_speech-medium.onnx
wget -P ~/.local/share/piper-voices https://huggingface.co/rhasspy/piper-voices/resolve/main/pl/pl_PL/mc_speech/medium/pl_PL-mc_speech-medium.onnx.json
```

**Other distros:** Build from source at https://github.com/rhasspy/piper

### Configure speech-dispatcher to use Piper

Create `~/.config/speech-dispatcher/speechd.conf`:

```
AudioOutputMethod "pulse"
DefaultLanguage "en-US"
```

Then configure the Piper module (see speech-dispatcher documentation for your distro). After setup, restart speech-dispatcher and your browser.

## Known issues

- **Chromium on Linux** may not list any voices until speech-dispatcher is running. Use the `spd-say` test first to confirm the backend works.
- Some browsers (Firefox) handle Linux TTS more reliably than Chromium-based browsers.
- If you use PipeWire instead of PulseAudio, ensure `pipewire-pulse` is installed for compatibility.
