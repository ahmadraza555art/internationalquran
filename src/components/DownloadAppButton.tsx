import { useState, useEffect, useCallback } from "react";
import { Download, X, Share, PlusSquare, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLang } from "@/lib/lang";

// Type for the deferred install prompt
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const DownloadAppButton = () => {
  const { t } = useLang();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [autoPrompted, setAutoPrompted] = useState(false);

  useEffect(() => {
    // Detect iOS Safari
    const ua = window.navigator.userAgent;
    const iOS = /iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream;
    setIsIOS(iOS);

    // Detect if already installed (standalone mode)
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as any).standalone === true;
    setIsStandalone(standalone);

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  // Auto-show install dialog when browser signals eligibility
  useEffect(() => {
    if (deferredPrompt && !autoPrompted && !isStandalone) {
      setShowDialog(true);
      setAutoPrompted(true);
    }
  }, [deferredPrompt, autoPrompted, isStandalone]);

  const handleInstallClick = useCallback(() => {
    setShowDialog(true);
  }, []);

  const handleNativeInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setDeferredPrompt(null);
    }
    setShowDialog(false);
  };

  // Don't show if already installed
  if (isStandalone) return null;

  return (
    <>
      <Button
        variant="gold"
        size="lg"
        className="gap-2"
        onClick={handleInstallClick}
        aria-label={t("Download Our App", "ہمارا ایپ ڈاؤنلوڈ کریں")}
      >
        <Download className="w-5 h-5" />
        {t("Download Our App", "ہمارا ایپ ڈاؤنلوڈ کریں")}
      </Button>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-xl">
              {t("Install ILQA App", "ILQA ایپ انسٹال کریں")}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-2">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                <Smartphone className="w-10 h-10 text-primary-foreground" />
              </div>
            </div>

            <p className="text-center text-muted-foreground">
              {t(
                "Add International Learn Quran Academy to your home screen for quick access to Quran classes anytime, anywhere.",
                "قرآن کی کلاسز کسی بھی وقت، کہیں بھی تیزی سے حاصل کرنے کے لیے International Learn Quran Academy کو اپنے ہوم اسکرین پر شامل کریں۔"
              )}
            </p>

            {isIOS ? (
              <div className="bg-muted rounded-xl p-4 space-y-3">
                <p className="font-semibold text-sm text-center">
                  {t("Follow these steps to install:", "انسٹال کرنے کے لیے یہ مراحل اپنائیں:")}
                </p>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary">
                    1
                  </div>
                  <span>
                    {t("Tap the ", "")}
                    <Share className="w-4 h-4 inline mx-1 text-primary" />
                    {t("Share button in Safari's toolbar", "Safari کے ٹول بار میں Share بٹن دبائیں")}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary">
                    2
                  </div>
                  <span>
                    {t("Scroll and tap ", "")}
                    <PlusSquare className="w-4 h-4 inline mx-1 text-primary" />
                    {t("'Add to Home Screen'", "'Add to Home Screen' پر ٹیپ کریں")}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 font-bold text-primary">
                    3
                  </div>
                  <span>
                    {t("Tap 'Add' to install the app", "'Add' دبا کر ایپ انسٹال کریں")}
                  </span>
                </div>
              </div>
            ) : deferredPrompt ? (
              <Button onClick={handleNativeInstall} className="w-full gap-2" variant="gold">
                <Download className="w-5 h-5" />
                {t("Install Now", "ابھی انسٹال کریں")}
              </Button>
            ) : (
              <div className="bg-muted rounded-xl p-4 text-center text-sm text-muted-foreground">
                {t(
                  "Your browser supports installing this app. Look for the install icon in your browser's address bar or menu.",
                  "آپ کا براؤزر اس ایپ کو انسٹال کرنے کی سہولت دیتا ہے۔ براؤزر کے ایڈریس بار یا مینیو میں انسٹال آئیکن تلاش کریں۔"
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DownloadAppButton;
