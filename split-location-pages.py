import json

# Load the large file
with open('src/data/pseo/industry-location-pages.json', 'r', encoding='utf-8') as f:
    all_pages = json.load(f)

# Split into 6 chunks of ~917 pages each
chunk_size = 917
for i in range(0, len(all_pages), chunk_size):
    chunk = all_pages[i:i+chunk_size]
    chunk_num = i//chunk_size + 1
    filename = f'src/data/pseo/industry-location-pages-{chunk_num}.json'
    with open(filename, 'w', encoding='utf-8') as f:
        json.dump(chunk, f, ensure_ascii=False)
    print(f"✅ Created {filename} with {len(chunk)} pages (~{len(json.dumps(chunk))/1024/1024:.1f}MB)")

print(f"\n🎉 Split {len(all_pages)} pages into {(len(all_pages)-1)//chunk_size + 1} files")
print("Now delete the original large file and update [slug].js")