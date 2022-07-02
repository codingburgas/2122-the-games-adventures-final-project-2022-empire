import os
import shutil

os.chdir('eight-ball-engine-web')
os.system("python build.py")
os.chdir('..')
shutil.copy("eight-ball-engine-web/dist/engine.mjs", "game-client/src/engine_wasm.js")