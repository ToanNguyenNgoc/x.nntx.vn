import { useState } from "react";
import { ImageIcon, X } from "lucide-react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { getCroppedImg } from "@/utils";

export default function PostCreationModal({
    onClose,
}: {
    onClose: () => void;
}) {
    const [step, setStep] = useState<"upload" | "crop" | "content">("upload");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [croppedImageUrl, setCroppedImageUrl] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [aspect, setAspect] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [caption, setCaption] = useState("");
    const [dragActive, setDragActive] = useState(false);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onCropComplete = (_: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const handleFile = (file: File) => {
        setImageFile(file);
        const url = URL.createObjectURL(file);
        setImageUrl(url);
        setStep("crop");
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragActive(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFile(file);
    };

    const showCroppedImage = async () => {
        if (!imageUrl || !croppedAreaPixels || !imageFile) return;
        const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
        setCroppedImageUrl(croppedImage);
        setStep("content");
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white w-[500px] rounded-xl overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b font-medium">
                    <span>
                        {step === "upload" && "Tạo bài viết mới"}
                        {step === "crop" && "Cắt"}
                        {step === "content" && "Tạo bài viết mới"}
                    </span>
                    <button onClick={onClose}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {step === "upload" && (
                    <div
                        onDragOver={(e) => e.preventDefault()}
                        onDragEnter={() => setDragActive(true)}
                        onDragLeave={() => setDragActive(false)}
                        onDrop={handleDrop}
                        className={`flex flex-col items-center justify-center py-12 border-dashed border-2 m-4 ${
                            dragActive
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-300"
                        }`}
                    >
                        <ImageIcon className="w-16 h-16 text-gray-400 mb-4" />
                        <p className="mb-4">Kéo ảnh và video vào đây</p>
                        <label className="bg-black text-white px-4 py-2 rounded cursor-pointer">
                            Chọn từ máy tính
                            <input
                                type="file"
                                accept="image/*,video/*"
                                hidden
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>
                )}

                {step === "crop" && imageUrl && (
                    <div className="relative w-full h-[400px] bg-black">
                        <Cropper
                            image={imageUrl}
                            crop={crop}
                            zoom={zoom}
                            aspect={aspect}
                            onCropChange={setCrop}
                            onZoomChange={setZoom}
                            onCropComplete={onCropComplete}
                        />
                        <div className="absolute bottom-4 left-4 flex gap-2">
                            {[1, 4 / 5, 16 / 9].map((a, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setAspect(a)}
                                    className={`text-xs px-3 py-1 rounded border ${
                                        aspect === a
                                            ? "bg-blue-500 text-white"
                                            : "bg-white text-black"
                                    }`}
                                >
                                    {a === 1
                                        ? "1:1"
                                        : a === 4 / 5
                                        ? "4:5"
                                        : "16:9"}
                                </button>
                            ))}
                        </div>
                        <div className="absolute bottom-4 right-4">
                            <Button
                                className="w-fit ml-auto cusor-pointer"
                                onClick={showCroppedImage}
                            >
                                Tiếp
                            </Button>
                        </div>
                    </div>
                )}

                {step === "content" && croppedImageUrl && (
                    <div className="flex">
                        <div className="w-1/2">
                            <img
                                src={croppedImageUrl}
                                alt="Preview"
                                className="object-cover w-full aspect-square"
                            />
                        </div>
                        <div className="w-1/2 p-4 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <img
                                    src="https://i.pravatar.cc/150?img=10"
                                    className="w-8 h-8 rounded-full"
                                    alt="Avatar"
                                />
                                <span className="font-medium text-sm">
                                    long__do
                                </span>
                            </div>
                            <textarea
                                rows={4}
                                className="w-full text-sm border rounded-md p-2"
                                placeholder="Viết chú thích..."
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                            />
                            <Button
                                className="w-fit ml-auto cusor-pointer"
                                onClick={() => alert("Chia sẻ thành công")}
                            >
                                Chia sẻ
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
