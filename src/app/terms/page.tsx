export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-16 max-w-4xl">
            <h1 className="text-4xl font-serif font-bold mb-8">Terms of Service</h1>
            <div className="prose prose-lg dark:prose-invert">
                <p className="text-muted-foreground mb-6">Last updated: {new Date().toLocaleDateString()}</p>

                <h2 className="text-2xl font-bold mb-4">1. Agreement to Terms</h2>
                <p className="mb-4 text-muted-foreground">
                    By accessing our website, you agree to be bound by these Terms of Service and to comply with all applicable laws and regulations. If you do not agree with these terms, you are prohibited from using or accessing this site.
                </p>

                <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
                <p className="mb-4 text-muted-foreground">
                    Permission is granted to temporarily download one copy of the materials (information or software) on RiadConnect&apos;s website for personal, non-commercial transitory viewing only.
                </p>

                <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
                <p className="mb-4 text-muted-foreground">
                    The materials on RiadConnect&apos;s website are provided on an &apos;as is&apos; basis. RiadConnect makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
            </div>
        </div>
    );
}
