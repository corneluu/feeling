const express = require('express');
const router = express.Router();
const { generateReflection } = require('../services/aiService');

// POST /api/reflect
router.post('/reflect', async (req, res) => {
    const { userInput } = req.body;
    try {


        // 1. Basic Validation
        if (!userInput || typeof userInput !== 'string' || userInput.trim().length === 0) {
            return res.status(400).json({ error: 'Please share how you are feeling.' });
        }

        if (userInput.length > 500) {
            return res.status(400).json({ error: 'Input is too long. Please keep it brief.' });
        }

        // 2. Call AI Service
        const reflection = await generateReflection(userInput);

        // 3. Return Response
        res.json(reflection);

    } catch (error) {
        console.error("Route Error:", error);

        // Fallback Response for reliability (Offline Mode)
        // We return 200 so the frontend displays comforting messages even without API credits.

        // 1. Define The Verse Database (Offline Mode)
        const verseDatabase = {
            joy: {
                keywords: ['happy', 'good', 'great', 'joy', 'excited', 'wonderful', 'blessed', 'amazing', 'fine', 'glad', 'thank', 'awesome'],
                verses: [
                    { acknowledgment: "It is a beautiful thing to feel such joy.", verse: { text: "This is the day which the Lord hath made: let us be glad and rejoice therein.", source: "Psalm 117:24 (Douay-Rheims)" }, reflection: "Happiness is a gift to be savored and shared." },
                    { acknowledgment: "Your heart is singing today.", verse: { text: "My soul doth magnify the Lord. And my spirit hath rejoiced in God my Saviour.", source: "Luke 1:46-47 (Douay-Rheims)" }, reflection: "Let your gratitude rise as a song." },
                    { acknowledgment: "Celebrate this moment of light.", verse: { text: "Rejoice in the Lord always; again, I say, rejoice.", source: "Philippians 4:4 (Douay-Rheims)" }, reflection: "Joy is not just a feeling, but a way of walking in the world." },
                    { acknowledgment: "Goodness is all around you.", verse: { text: "Give thanks to the Lord, for he is good: for his mercy endureth for ever.", source: "Psalm 117:1 (Douay-Rheims)" }, reflection: "A thankful heart opens the door to even greater abundance." },
                    { acknowledgment: "Peace falls like a gentle rain.", verse: { text: "The Lord bless thee, and keep thee. The Lord shew his face to thee, and have mercy on thee.", source: "Numbers 6:24-25 (Douay-Rheims)" }, reflection: "Receive this blessing as a shield of light." },
                    { acknowledgment: "Your joy is a testimony.", verse: { text: "The fruit of the Spirit is charity, joy, peace, patience, benignity, goodness, longanimity.", source: "Galatians 5:22 (Douay-Rheims)" }, reflection: "Let your life bear this fruit in abundance." }
                ]
            },
            anxiety: {
                keywords: ['anxious', 'worry', 'afraid', 'fear', 'scared', 'nervous', 'stressed', 'panic', 'tense', 'overwhelmed'],
                verses: [
                    { acknowledgment: "Breathe. You are not facing this alone.", verse: { text: "Fear not, for I am with thee: turn not aside, for I am thy God: I have strengthened thee, and have helped thee.", source: "Isaiah 41:10 (Douay-Rheims)" }, reflection: "You are held by a strength greater than your fear." },
                    { acknowledgment: "Let your heart find a quiet rhythm.", verse: { text: "Peace I leave with you, my peace I give unto you... Let not your heart be troubled, nor let it be afraid.", source: "John 14:27 (Douay-Rheims)" }, reflection: "There is a peace that does not depend on your circumstances." },
                    { acknowledgment: "Cast your cares upon Him.", verse: { text: "Be nothing solicitous; but in every thing, by prayer and supplication, with thanksgiving, let your petitions be made known to God.", source: "Philippians 4:6 (Douay-Rheims)" }, reflection: "Surrender is not giving up; it is handing over the weight to One who can carry it." },
                    { acknowledgment: "You are safe.", verse: { text: "The Lord is my light and my salvation, whom shall I fear?", source: "Psalm 26:1 (Douay-Rheims)" }, reflection: "Light requires no defense; it simply shines." }
                ]
            },
            sadness: {
                keywords: ['sad', 'cry', 'grief', 'hurting', 'pain', 'lonely', 'depressed', 'down', 'broken', 'lost', 'miss'],
                verses: [
                    { acknowledgment: "It is okay to grieve; your tears are seen.", verse: { text: "The Lord is nigh unto them that are of a contrite heart: and he will save the humble of spirit.", source: "Psalm 33:19 (Douay-Rheims)" }, reflection: "You do not have to be strong right now; you just have to be." },
                    { acknowledgment: "Healing is a journey.", verse: { text: "He healeth the broken in heart, and bindeth up their bruises.", source: "Psalm 146:3 (Douay-Rheims)" }, reflection: "Every small step towards wholeness matters." },
                    { acknowledgment: "You are never truly alone.", verse: { text: "Blessed are they that mourn: for they shall be comforted.", source: "Matthew 5:5 (Douay-Rheims)" }, reflection: "There is a comfort that comes only when we allow ourselves to feel." },
                    { acknowledgment: "Light will return.", verse: { text: "For his wrath shall be in a moment, and in his will is life. In the evening weeping shall have place, and in the morning gladness.", source: "Psalm 29:6 (Douay-Rheims)" }, reflection: "The night is real, but so is the morning." }
                ]
            },
            anger: {
                keywords: ['angry', 'mad', 'furious', 'upset', 'hate', 'annoyed', 'frustrated', 'rage', 'resent'],
                verses: [
                    { acknowledgment: "It is easy to feel burning heat when things are wrong.", verse: { text: "Be angry, and sin not: let not the sun go down upon your anger.", source: "Ephesians 4:26 (Douay-Rheims)" }, reflection: "Emotion is human; what we do with it is the path to grace." },
                    { acknowledgment: "Peace is a choice we make.", verse: { text: "A mild answer breaketh wrath: but a harsh word stirreth up fury.", source: "Proverbs 15:1 (Douay-Rheims)" }, reflection: "Gentleness is often stronger than force." },
                    { acknowledgment: "Let patience be your shield.", verse: { text: "Let every man be swift to hear, but slow to speak, and slow to anger.", source: "James 1:19 (Douay-Rheims)" }, reflection: "In the pause before reacting, we find our better selves." }
                ]
            },
            confusion: {
                keywords: ['confused', 'lost', 'unsure', 'doubt', 'direction', 'know', 'decision', 'hard', 'stuck'],
                verses: [
                    { acknowledgment: "The path isn't always clear, and that is okay.", verse: { text: "Have confidence in the Lord with all thy heart, and lean not upon thy own prudence.", source: "Proverbs 3:5 (Douay-Rheims)" }, reflection: "Trust is walking without seeing the whole staircase." },
                    { acknowledgment: "Wisdom is given to those who ask.", verse: { text: "If any of you want wisdom, let him ask of God, who giveth to all men abundantly.", source: "James 1:5 (Douay-Rheims)" }, reflection: "The answer often comes in the silence." },
                    { acknowledgment: "You are being guided.", verse: { text: "Thy word is a lamp to my feet, and a light to my paths.", source: "Psalm 118:105 (Douay-Rheims)" }, reflection: "You only need light for the next step." }
                ]
            },
            weariness: {
                keywords: ['tired', 'exhausted', 'weary', 'burnout', 'sleepy', 'weak', 'drain', 'heavy'],
                verses: [
                    { acknowledgment: "Rest is holy.", verse: { text: "Come to me, all you that labour, and are burdened, and I will refresh you.", source: "Matthew 11:28 (Douay-Rheims)" }, reflection: "You were not made to carry the world." },
                    { acknowledgment: "Strength will be renewed.", verse: { text: "They that hope in the Lord shall renew their strength... they shall run and not be weary.", source: "Isaiah 40:31 (Douay-Rheims)" }, reflection: "Waiting is an active state of restoration." },
                    { acknowledgment: "You are held.", verse: { text: "I can do all these things in him who strengtheneth me.", source: "Philippians 4:13 (Douay-Rheims)" }, reflection: "Your strength is limited, but His is infinite." }
                ]
            },
            love: {
                keywords: ['love', 'loved', 'relationship', 'care', 'friend', 'family', 'heart', 'marriage'],
                verses: [
                    { acknowledgment: "Love is the anchor of the soul.", verse: { text: "Charity is patient, is kind: charity envieth not, dealeth not perversely.", source: "1 Corinthians 13:4 (Douay-Rheims)" }, reflection: "True love seeks the good of the other." },
                    { acknowledgment: "You are loved perfectly.", verse: { text: "Let us therefore love God, because God first hath loved us.", source: "1 John 4:19 (Douay-Rheims)" }, reflection: "We love because we are an echo of the Divine love." },
                    { acknowledgment: "Love drives out fear.", verse: { text: "There is no fear in charity: but perfect charity casteth out fear.", source: "1 John 4:18 (Douay-Rheims)" }, reflection: "Where love reigns, anxiety cannot hold its throne." }
                ]
            },
            generic: {
                // Fallback if no keywords match
                verses: [
                    { acknowledgment: "In the silence, there is strength.", verse: { text: "The Lord is my shepherd, I shall not want.", source: "Psalm 22:1 (Douay-Rheims)" }, reflection: "You are completely provided for." },
                    { acknowledgment: "Trust in the timing of your life.", verse: { text: "To all things there is a time, and a time to every purpose under heaven.", source: "Ecclesiastes 3:1 (Douay-Rheims)" }, reflection: "Every season has its purpose." },
                    { acknowledgment: "You are valued.", verse: { text: "Consider the lilies of the field... they labour not, neither do they spin.", source: "Matthew 6:28 (Douay-Rheims)" }, reflection: "Your worth is inherent, not earned." },
                    { acknowledgment: "Patience is a form of faith.", verse: { text: "Be patient, therefore, brethren, until the coming of the Lord.", source: "James 5:7 (Douay-Rheims)" }, reflection: "Growth happens in the waiting." }
                ]
            }
        };

        // 2. Sentiment Matching Logic
        const lowerInput = userInput.toLowerCase();
        let selectedCategory = 'generic';

        // Check if input matches any category keywords
        for (const [category, data] of Object.entries(verseDatabase)) {
            if (category === 'generic') continue;
            const hasMatch = data.keywords.some(keyword => lowerInput.includes(keyword));
            if (hasMatch) {
                selectedCategory = category;
                break; // Found a match, stop looking
            }
        }

        // 3. Select Random Verse from Category
        const categoryData = verseDatabase[selectedCategory];
        const randomFallback = categoryData.verses[Math.floor(Math.random() * categoryData.verses.length)];

        res.status(200).json(randomFallback);
    }
});

module.exports = router;
