import cv2
from pathlib import Path

video_path = Path('reference/website-reference.mp4')
out_dir = Path('reference/frames')
out_dir.mkdir(exist_ok=True)

cap = cv2.VideoCapture(str(video_path))
if not cap.isOpened():
    raise SystemExit(f'Unable to open video: {video_path}')

fps = cap.get(cv2.CAP_PROP_FPS) or 30
count = int(cap.get(cv2.CAP_PROP_FRAME_COUNT) or 0)
print(f'fps={fps} frames={count}')

sample_times = [0, 3, 6, 10, 16, 22, 30, 38, 46]
for idx, seconds in enumerate(sample_times):
    frame_pos = int(seconds * fps)
    cap.set(cv2.CAP_PROP_POS_FRAMES, min(frame_pos, max(count - 1, 0)))
    ok, frame = cap.read()
    if ok:
        out_path = out_dir / f'frame_{idx}_{seconds}s.png'
        cv2.imwrite(str(out_path), frame)
        print(out_path)

cap.release()
