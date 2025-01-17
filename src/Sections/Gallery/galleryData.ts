export interface GalleryImage {
  id: number
  src: string
  title: string
  description: string
  specs: {
    material: {
      shaft: string
      fletching: string
      paper: string
      furubiki: string
      featherProcess: string
      decoration: string
    }
  }
}

export const galleryImages: GalleryImage[] = Array.from({ length: 15 }, (_, i) => {
  if (i === 7) {
    return {
      id: 8,
      src: "/gallery/gallery-1.jpg",
      title: "特選 黒尾羽付竹矢",
      description: "最高級の素材と職人技が結実した逸品。黒尾羽を使用し、伝統的な美しさと現代的な性能を両立させています。",
      specs: {
        material: {
          shaft: "黒",
          fletching: "ゴマ符 青",
          paper: "W094_松黒",
          furubiki: "L001_金",
          featherProcess: "無し",
          decoration: "無し"
        }
      }
    }
  }

  return {
    id: i + 1,
    src: `/gallery/${i + 1}.jpg`,
    title: `竹矢 ${i + 1}`,
    description: "伝統的な手法で作られた竹矢。職人による丁寧な仕上げと、厳選された素材による優れた飛行性能を実現しています。",
    specs: {
      material: {
        shaft: "黒",
        fletching: "ゴマ符 青",
        paper: "W094_松黒",
        furubiki: "L001_金",
        featherProcess: "無し",
        decoration: "無し"
      }
    }
  }
})